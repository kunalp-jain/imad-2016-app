var submit = document.getElementById('submit_btn');
submit.onclick = function () {

    // Create a request object
    var request = new XMLHttpRequest();

    // Capture the response and store it in a variable
    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              // Capture a list of names and render it as a list
              var names = request.responseText;
              names = JSON.parse(names);
              var list = '';
              for (var i=0; i< names.length; i++) {
                  list += '<li>' + names[i] + '</li>';
              }
              var ul = document.getElementById('commentlist');
              ul.innerHTML = list;
          }
      }
      // Not done yet
    };

    // Make the request
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET', 'http://localhost:8082/submit-comment?comment=' + comment, true);
    request.send(null);

};
