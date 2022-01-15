// const fa_dfa = document.getElementById('fa-dfa');
// const fa_nfa = document.getElementById('fa-nfa');

const fa_q = document.getElementById('fa-q');
const fa_sigma = document.getElementById('fa-sigma');
const fa_q0 = document.getElementById('fa-q0');
const fa_f = document.getElementById('fa-f');
const fa_input = document.getElementById('fa-input');
const fa_result = document.getElementById('fa-result');

const fa_delta_label = document.getElementById('fa-delta-label');
const fa_delta_table = document.getElementById('fa-delta-table');

var q = [];
var sigma = [];
var delta = [];
var q0 = '';
var f = [];
var input = [];

function generateTable() {
  // console.log('generating table!');
  if (fa_q.value.trim() === '' || fa_sigma.value.trim() === '') {
    fa_result.style.color = 'red';
    fa_result.innerHTML = 'please fill in Q and &Sigma;';
    return;
  }
  var q = fa_q.value.trim().split(" ");
  var sigma = fa_sigma.value.trim().split(" ");

  var table = '';
  var row = '<tr><th></th>';

  for (let i = 0; i < sigma.length; i += 1) {
    row += '<th>' + sigma[i] + '</th>';
  }
  row += '</tr>';
  table += row;

  for (let i = 0; i < q.length; i += 1) {
    row = '<tr><th>' + q[i] + '</th>';
    for (let j = 0; j < sigma.length; j += 1) {
      row += '<td><input id="fa-delta-' + i + '-' + j + '" name="fa-q" type="text"></td>';
    }
    row += '</tr>';
    table += row;
  }
  fa_delta_table.innerHTML = table;
  fa_delta_label.style.display = 'block';
  fa_delta_table.hidden = false;
}

function check() {
  // console.log('checking!');

  q = fa_q.value.trim().split(' ');
  sigma = fa_sigma.value.trim().split(' ');
  try {
    for (let i = 0; i < q.length; i += 1) {
      var row = [];
      for (let j = 0; j < sigma.length; j += 1) {
        row[j] = document.getElementById('fa-delta-' + i + '-' + j).value.trim().split(' ')[0];
      }
      delta[i] = row;
    }
  } catch (error) {
    fa_result.style.color = 'red';
    fa_result.innerHTML = 'generate a new table';
    return;
  }

  q0 = fa_q0.value.trim().split(' ')[0];
  f = fa_f.value.trim().split(' ');
  input = fa_input.value.trim().split('');

  if (input.length == 0) {
    fa_result.innerHTML = 'test';
    for (let i = 0; i < f.length; i++) {
      if (q0 == f[i]) {
        fa_result.style.color = 'green';
        fa_result.innerHTML = 'accepted';
        return;
      } else {
        fa_result.style.color = 'red';
        fa_result.innerHTML = 'not accepted';
      }
    }
  } else {
    var next_state = q0;
    for (let i = 0; i < input.length; i += 1) {
      var sigma_index = sigma.indexOf(input[i]);
      var q_index = q.indexOf(next_state);
      next_state = delta[q_index][sigma_index];
    }
    for (let k = 0; k < f.length; k += 1) {
      if (next_state == f[k]) {
        fa_result.style.color = 'green';
        fa_result.innerHTML = 'accepted';
        return;
      } else {
        fa_result.style.color = 'red';
        fa_result.innerHTML = 'not accepted';
      }
    }
  }
}