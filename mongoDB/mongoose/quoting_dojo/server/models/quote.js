const mongoose = require("mongoose");



const QuoteSchema = new mongoose.Schema({
    name: { 
    	type: String, 
    	required: true, 
    	minlength: 2 
    },
    quote: { 
    	type: String, 
    	required: true, 
    	minlength: 2 },
    date: { 
    	type: Date, 
    	default: Date.now }
	}, 
	{ timestamps: true });


mongoose.model('Quote', QuoteSchema);

module.exports = mongoose.model("Quote");
