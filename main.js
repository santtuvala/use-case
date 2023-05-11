let polls = [];

function displayPolls() {
    let html = '';
    for (let i = 0; i < polls.length; i++) {
        let poll = polls[i];
        html += '<div>';
        html += '<h3>' + poll.question + '</h3>';
        html += '<ul>';
        for (let j = 0; j < poll.options.length; j++) {
            html += '<li>' + poll.options[j] + ': ' + poll.votes[j] + '</li>';
        }
        html += '</ul>';
        if (!poll.voted) {
            html += '<input type="text" id="poll_' + i + '" placeholder="Your vote">';
            html += '<button onclick="vote(' + i + ')">Vote</button>';
        } else {
            html += '<p>You have already voted in this poll.</p>';
        }
        html += '</div>';
    }
    document.getElementById('polls').innerHTML = html;
}

function createPoll() {
    let question = document.getElementById('pollQuestion').value;
    let options = document.getElementById('pollOptions').value.split(',');
    let poll = {
        question: question,
        options: options,
        votes: Array(options.length).fill(0),
        voted: false
    };
    polls.push(poll);
    displayPolls();
}

function removePoll() {
    let id = document.getElementById('pollId').value;
    polls.splice(id, 1);
    displayPolls();
}

function vote(pollId) {
    let input = document.getElementById('poll_' + pollId);
    let vote = input.value.trim();
    if (vote === '') {
        alert('Please enter a vote.');
        return;
    }
    let poll = polls[pollId];
    let index = poll.options.findIndex((option) => option.trim() === vote);
    if (index === -1) {
        alert('Invalid vote.');
        return;
    }
    poll.votes[index]++;
    poll.voted = true;
    input.disabled = true;
    input.parentNode.removeChild(input.nextSibling);
    input.parentNode.removeChild(input);
    displayPolls();
}

function login() {
    let password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
        document.getElementById('adminOptions').style.display = 'block';
    } else {
        alert('Incorrect password.');
    }
}

function initializePage() {
    let poll1 = {
        question: 'What is your favorite color?',
        options: ['Red', 'Green', 'Blue'],
        votes: [0, 0, 0],
        voted: false
    };
    let poll2 = {
        question: 'What is your favorite food?',
        options: ['Pizza', 'Tacos', 'Burgers'],
        votes: [0, 0, 0],
        voted: false
    };
    polls.push(poll1);
    polls.push(poll2);
    displayPolls();
}

window.onload = initializePage;