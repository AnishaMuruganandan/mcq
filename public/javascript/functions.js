var result;
var questionNoStart;
var questionNoEnd;
var dataposition;
jsonObj = [];
//  e.preventDefault();
$(document).ready(function() {








  // Set the date we're counting down to

  // Get todays date and time

  var now = new Date();
  var countDownDate = now.setTime(now.getTime() + (1000 * 902));
  // var countDownDate = now.setMinutes(now.getMinutes() + 15.2);
  // Update the count down every 1 second
  var x = setInterval(function() {

    var date = new Date().getTime();
    // Find the distance between now an the count down date
    var distance = countDownDate - date;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    $("#time").html(minutes + ":" + ('0' + seconds).slice(-2));

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("time").innerHTML = "EXPIRED";
      $('#submit').on('click', resultcalculation);
    }
  }, 1000);






  $('#submit').hide();
  $('#previous').off('click');

  console.log('hey');
  console.log('first call from mcq app');

  function ajax() {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        url: '/mcqFetching',
        // result = data,
        // console.log(data);
        success: function(data) {
          result = data;
          questionNoStart = 1;
          questionNoEnd = data.length;
          // console.log('result', result);
          resolve(data);
        },
        error: function(xhr) {
          reject(xhr)
        }
      });
    });
  }
  // console.log('result', result);
  //  ajax();
  ajax().then(function(data) {
    dataposition = 0;
    result = data;
    console.log('result', result);
    console.log('common data', data);
    $('#questionNo').html("Question " + questionNoStart + " out of " + questionNoEnd);
    $('#question').html(data[dataposition].question);

    $('#optiona').html(data[dataposition].optiona);
    $('#optionb').html(data[dataposition].optionb);
    $('#optionc').html(data[dataposition].optionc);
    $('#optiond').html(data[dataposition].optiond);

  }).catch(function(reason) {
    console.log('reason for rejection', reason)
  });
});
$('#next').click(function() {



  $('#previous').on('click', previousclick);

  console.log(questionNoStart);
  console.log(result.length - 1);


  if (questionNoStart == (result.length - 1)) {
    $('#next').hide();
    $('#submit').show();
    $('#submit').on('click', resultcalculation);
    console.log('id changed' + $('#submit').attr('id'));
  }

  dataposition += 1;
  questionNoStart += 1;


  $('#questionNo').html("Question " + questionNoStart + " out of " + questionNoEnd);
  $('#question').html(result[dataposition].question);

  $('#optiona').html(result[dataposition].optiona);
  $('#optionb').html(result[dataposition].optionb);
  $('#optionc').html(result[dataposition].optionc);
  $('#optiond').html(result[dataposition].optiond);





});


function previousclick() {
  $('#next').show();
  $('#submit').hide();
  $('#next').html("Next");
  console.log(questionNoStart);
  console.log(result.length - 1);
  if (questionNoStart == 2) {
    $('#previous').off('click');

  }
  dataposition -= 1;
  questionNoStart -= 1;

  $('#questionNo').html("Question " + questionNoStart + " out of " + questionNoEnd);
  $('#question').html(result[dataposition].question);

  $('#optiona').html(result[dataposition].optiona);
  $('#optionb').html(result[dataposition].optionb);
  $('#optionc').html(result[dataposition].optionc);
  $('#optiond').html(result[dataposition].optiond);




}
var j = 0;
var returnedvalue;
$('#optiona').click(function() {
  item = {};
  returnedvalue = findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "a";

    jsonObj.push(item);

  } else {
    jsonObj[returnedvalue].answer = "a";
  }
  console.log(jsonObj);
});
$('#optionb').click(function() {
  item = {};
  returnedvalue = findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "b";

    jsonObj.push(item);
  } else {
    jsonObj[returnedvalue].answer = "b";
  }
  console.log(jsonObj);
});
$('#optionc').click(function() {
  item = {};
  returnedvalue = findingindex();
  console.log(returnedvalue);
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "c";

    jsonObj.push(item);
  } else {
    jsonObj[returnedvalue].answer = "c";
  }
  console.log(jsonObj);
});
$('#optiond').click(function() {
  item = {};
  returnedvalue = findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "d";

    jsonObj.push(item);
  } else {
    jsonObj[returnedvalue].answer = "d";
  }
  console.log(jsonObj);
});
var bool = false;
var index;

function findingindex() {
  $.each(jsonObj, function(i, item) {

    if (jsonObj[i].questionNo == questionNoStart) {
      bool = true;
      index = i;
    }
  });
  if (bool == false) {


    console.log("inside fun");
    index = -1;

  } else {

    bool = false;
  }
  return index;
}
var marks = 0;

function resultcalculation() {

  $.each(result, function(i, item) {
    $.each(jsonObj, function(j, jsonkey) {
      if (result[i].questionno == jsonObj[j].questionNo) {
        if (result[i].answer == jsonObj[j].answer) {
          marks += 1;
        }
      }
    })

  })
  console.log('marks ' + marks);
  $('#score').html("marks");

   window.location.replace('display.html');
   document.getElementById("score").innerHTML="hello";

}
