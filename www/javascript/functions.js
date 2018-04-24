var serviceDeclarationJS = {
// result,
//  questionNoStart,
//  questionNoEnd,
  marks : 0,
//  dataposition,
 jsonObj : [],
//  e.preventDefault();

register : function(){

      console.log('button clicked');

      var data = {};
      data.name = $('#nameinput').val();
      data.phoneno = $('#phonenoinput').val();
      data.password = $('#passwordinput').val();
      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
      //  url: '/registration',
         url: 'https://multiplechoicequestion.herokuapp.com/registration',
        success: function(data) {
          console.log(data[data.length-1].name);
          var name = data[data.length-1].name;
  $.cookie('username', name );
          window.location = 'mcq.html';

        }


      });

},
fetchquestionandtimer : function() {


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
      $('#submit').on('click', serviceDeclarationJS.resultcalculation);
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
        url: 'https://multiplechoicequestion.herokuapp.com/mcqFetching',
        // result = data,

        success: function(data) {
          console.log(data);
          result = data;
       questionNoStart = 1;
        questionNoEnd = data.length;
           console.log('result', result);
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
},
nextmcq: function(){



  $('#previous').on('click', serviceDeclarationJS.previousmcq);

  console.log(questionNoStart);
  console.log(result.length - 1);


  if (questionNoStart == (result.length - 1)) {
    $('#next').hide();
    $('#submit').show();
    $('#submit').on('click', serviceDeclarationJS.resultcalculation);
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





},


previousmcq: function(){
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




},
 j : 0,
 // var returnedvalue,
optiona : function(){
  item = {};
  returnedvalue = serviceDeclarationJS.findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "a";

    serviceDeclarationJS.jsonObj.push(item);

  } else {
    serviceDeclarationJS.jsonObj[returnedvalue].answer = "a";
  }
  console.log(serviceDeclarationJS.jsonObj);
},
optionb : function(){
  item = {};
  returnedvalue = serviceDeclarationJS.findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "b";

    serviceDeclarationJS.jsonObj.push(item);
  } else {
    serviceDeclarationJS.jsonObj[returnedvalue].answer = "b";
  }
  console.log(serviceDeclarationJS.jsonObj);
},
optionc : function() {
  item = {};
  returnedvalue = serviceDeclarationJS.findingindex();
  console.log(returnedvalue);
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "c";

    serviceDeclarationJS.jsonObj.push(item);
  } else {
    serviceDeclarationJS.jsonObj[returnedvalue].answer = "c";
  }
  console.log(serviceDeclarationJS.jsonObj);
},
optiond : function()  {
  item = {};
  returnedvalue = serviceDeclarationJS.findingindex();
  if (returnedvalue == -1) {
    item["questionNo"] = questionNoStart;
    item["answer"] = "d";

    serviceDeclarationJS.jsonObj.push(item);
  } else {
    serviceDeclarationJS.jsonObj[returnedvalue].answer = "d";
  }
  console.log(serviceDeclarationJS.jsonObj);
},

 // index,

findingindex: function() {
   var bool = false
  $.each(serviceDeclarationJS.jsonObj, function(i, item) {

    if (serviceDeclarationJS.jsonObj[i].questionNo == questionNoStart) {
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
},


resultcalculation: function()  {

  $.each(result, function(i, item) {
    $.each(serviceDeclarationJS.jsonObj, function(j, jsonkey) {
      if (result[i].questionno == serviceDeclarationJS.jsonObj[j].questionNo) {
        if (result[i].answer == serviceDeclarationJS.jsonObj[j].answer) {
          serviceDeclarationJS.marks =serviceDeclarationJS.marks + 1;
        }
      }
    })

  })
  console.log('marks ' + serviceDeclarationJS.marks);


   window.location.replace("display.html"+"?marks="+serviceDeclarationJS.marks);


},


marksscored: function() {
  var hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
   for(var i = 0; i < hashes.length; i++)
   {
       hash = hashes[i].split('=');
     }
      console.log('marks ' + hash[1]);
      var score=hash[1]*10;
      $('#namedisplay').html($.cookie('username'));
if(score>=50){
$(".name").after("<div><img src='/img/pass.png'></div>");
}
else{
$(".name").after("<div><img src='/img/fail.png'></div>");
}

   $("#score").html("You Scored "+score+"%");

 }
};
