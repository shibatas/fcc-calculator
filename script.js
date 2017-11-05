var memory;
var display;
var input = [];
var flag = false; //true after = or CE
var decimal = false; //true if decimal point is used
var patt = new RegExp('[0-9.]');

function getInput(val) {
  if (val==='.') {
    if (decimal) {
      val = '';
    }
    decimal = true;
  } else if (patt.test(val)===false) {
    decimal = false;
  } //handle decimals - avoid double decimal in same number


  if (flag && patt.test(val)) {
    input = [];
  } //clear memory if first input is a number, immediately after = or CE

  if (patt.test(input[input.length-1])===false && patt.test(val)===false) {
    input.pop();
  } //if two non-numbers are repeated, overwrite the non-numeric character

  input.push(val);
  $('.subtext').html(input);

  flag = false;
}

function getResult() {
  memory = eval(input.join(''));
  display = memory;
  if (Number(memory) > 999999999999) {
    //alert('exponential');
    display = memory.toExponential();
  }

  //alert(memory.toString().length);
  if (memory.toString().length > 15) {
    //alert('rounding');
    display = Math.round(memory*1e15)/1e15;
    $('.result').html(display);
  } else {
    $('.result').html(display);
  }

    input = [memory.toString()];
    $('.subtext').html(input);

  flag = true;
  decimal = false;
}

function clearEntry() {
  input = [memory.toString()];
  $('.subtext').html(input);
  flag = true;
  decimal = false;
}

function allClear() {
  memory = 0;
  display = memory;
  $('.result').html(display);

  input = [display.toString()];
  $('.subtext').html(input);

  flag = false;
  decimal = false;
}
