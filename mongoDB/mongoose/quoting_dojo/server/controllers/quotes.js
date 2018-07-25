const Quote = require("../models/quote.js");

//export to routes
module.exports = {
    
    index: function(req, res) {
        res.render("index");
    },

    get_quotes: function(req,res){
        
        Quote.find({}, function(err,quotes){
            if(err){
                console.log("error finding quote")
                res.redirect('/')
            } else {
                res.render("quotes", {quotes: quotes});
            }
        });
    },

    post_quote: function(req, res) {
        let quote = new Quote(req.body);
        quote.save(function(err) {
            if (err) {
                for (let key in err.errors) {
                    req.flash('quote', err.errors[key].message)
                }
                res.redirect('/');
            } else {
                req.flash('success', 'Your quote has been submitted!');
                res.redirect('/quotes');
            }
        });
    }
}

