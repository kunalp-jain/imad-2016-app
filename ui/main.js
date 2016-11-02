var submit = document.getElementById('submit_btn');
submit.onclick = function () {

        var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
      if (request.readyState === XMLHttpRequest.DONE) {
          // Take some action
          if (request.status === 200) {
              
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
        };

    
    var commentInput = document.getElementById('comment');
    var comment = commentInput.value;
    request.open('GET', 'http://githubashutoshsoni.imad.hasura-app.io/submit-comment?comment=' + comment, true);
    request.send(null);

};
