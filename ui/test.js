app.post('/intro-comment-submit', function (req, res) {
   // Check if the user is logged in
   var comment=req.body.usercomment;
   
    if (req.session && req.session.auth && req.session.auth.userId) {
      pool.query('INSERT INTO mycomment (comment) VALUES ($1)', [comment], function (err, result) {
         if (err) {
             res.status(500).send(err.toString());
         } else {
             res.send('comment added  successfully');
         }
      });

        
    } else {
        res.status(403).send('Only logged in users can comment');
    }
});
