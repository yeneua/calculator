const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

const TASKS_FILE = path.join(__dirname, '../docs/TASKS.md');

function parseTasks(content) {
    const tasks = [];
    const lines = content.split(/\r?\n/);
    let currentTask = null;
    let currentSection = null;
    let currentPhase = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
            currentPhase = trimmed.replace(/^##\s*/, '').trim();
            continue;
        }

        if (trimmed.startsWith('###') && trimmed.includes('TASK-')) {
            const parts = trimmed.split(':');
            if (parts.length >= 2) {
                const idPart = parts[0].match(/TASK-\d+/);
                if (idPart) {
                    const id = idPart[0];
                    const title = parts.slice(1).join(':').trim();

                    if (currentTask) tasks.push(currentTask);

                    currentTask = {
                        id: id,
                        title: title,
                        phase: currentPhase,
                        content: [],
                        acceptance: [],
                        fr: '',
                        priority: '',
                        estimate: '',
                        dependencies: ''
                    };
                    currentSection = 'meta';
                    continue;
                }
            }
        }

        if (!currentTask) continue;

        if (trimmed.startsWith('**작업 내용**')) currentSection = 'content';
        else if (trimmed.startsWith('**인수 조건**')) currentSection = 'acceptance';
        else if (line.startsWith('**관련 FR**')) {
            currentTask.fr = line.replace('**관련 FR**:', '').trim();
            currentSection = null;
        }
        else if (trimmed === '---') continue;

        if (currentSection === 'meta') {
            if (line.includes('**우선순위**')) currentTask.priority = line.split(':')[1]?.trim() || '';
            if (line.includes('**예상 시간**')) currentTask.estimate = line.split(':')[1]?.trim() || '';
            if (line.includes('**의존성**')) currentTask.dependencies = line.split(':')[1]?.trim() || '';
        }
        else if (currentSection === 'content') {
            if (trimmed && !trimmed.startsWith('**작업 내용**')) {
                currentTask.content.push(line);
            }
        }
        else if (currentSection === 'acceptance') {
            if (trimmed && !trimmed.startsWith('**인수 조건**')) {
                currentTask.acceptance.push(line);
            }
        }
    }

    if (currentTask) tasks.push(currentTask);
    return tasks;
}

function generateIssueBody(task) {
    return `## 🔍 작업 배경 (Background)
**Phase**: ${task.phase}
**관련 FR**: ${task.fr}
**우선순위**: ${task.priority}
**예상 시간**: ${task.estimate}
**의존성**: ${task.dependencies}

## 📋 작업 내용 (Content)
${task.content.join('\n')}

## ✅ 인수 조건 (Acceptance Criteria)
${task.acceptance.join('\n')}`;
}

function main() {
    if (!fs.existsSync(TASKS_FILE)) {
        console.error(`File not found: ${TASKS_FILE}`);
        process.exit(1);
    }

    const content = fs.readFileSync(TASKS_FILE, 'utf-8');
    console.log(`Analyzing TASKS.md...`);
    const tasks = parseTasks(content);
    console.log(`Found ${tasks.length} tasks.`);

    // Skip TASK-001 and TASK-002 (already created)
    const tasksToCreate = tasks.filter(t => {
        const num = parseInt(t.id.replace('TASK-', ''));
        return num >= 3;
    });

    console.log(`Creating ${tasksToCreate.length} remaining tasks (TASK-003 to TASK-033)...\n`);

    for (const task of tasksToCreate) {
        const title = `[${task.id}] ${task.title}`;
        const body = generateIssueBody(task);

        try {
            console.log(`Creating issue: ${title}...`);

            const tmpFile = path.join(os.tmpdir(), `${task.id}-body.md`);
            fs.writeFileSync(tmpFile, body, 'utf-8');

            const cmd = `gh issue create --title "${title.replace(/"/g, '\\"')}" --body-file "${tmpFile}"`;
            execSync(cmd, { stdio: 'inherit' });

            fs.unlinkSync(tmpFile);

            console.log(`✅ ${task.id} created successfully.\n`);

            // Sleep to avoid rate limits
            const end = Date.now() + 1000;
            while (Date.now() < end) { }
        } catch (error) {
            console.error(`❌ Failed to create issue ${task.id}:`, error.message);
        }
    }

    console.log('\n🎉 All issues created!');
}

main();
