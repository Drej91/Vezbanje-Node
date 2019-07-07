var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port =  3000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

//Promenljiva prijatelji sluzi samo za vezbanje, inace se koristi baza podataka.
//Svaki put kad restartujemo server, promene u ovoj promenljivoj se brisu.
var prijatelji = ["Duka", "Nesovanovic", "Milos", "Filip", "Novica", "Dzoni"];

app.get('/', (req, res) => res.render('home') );

app.get('/fallinlovewith/:thing', function(req, res){
    var thing = req.params.thing;
    res.render('love', {thingVar: thing});
})

app.get('/posts', function(req, res){
    var posts = [
        {title: "Knjiga 1", author: 'Pera'},
        {title: "Knjiga 2", author: 'Mika'},
        {title: "Knjiga 3", author: "Zika"}
    ];
    res.render("posts", {posts: posts})
});

app.get('/ruta', function(req, res){
    res.render('home2');
});


//Na ovaj nacin, metodom get, dobijamo sve elemente iz niza prijatelji i saljemo ih na putanju /friends.
app.get('/friends', function(req, res){
    res.render('friends', {prijatelji: prijatelji});
});


//Post metoda kojom preko forme u promeljivu skladistimo ime koje zatim dodajemo u niz prijatelji.
app.post("/dodajprijatelja", function(req, res){
    var noviPrijatelj = req.body.noviprijatelj;
    prijatelji.push(noviPrijatelj);
    res.redirect('/friends'); //Sluzi da nas odmah nakon dodavanja prijatelja usmeri na putanju na kojoj se nalaze svi prijatelji iz naseg niza
});

app.get('/speak/:animal', function(req, res){
    var sounds = {
        pig: 'Grok',
        cow: 'Moo',
        dog: 'Woof Woof!',
        cat: 'I hate you human',
        goldfish: '...'
    };
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The "+ animal + " says '" + sound + "'");

});

app.get("/repeat/:message/:times", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
    for(var i = 0; i < times; i++){
        result += message + " ";
    }
    res.send(result);
});

app.get('*', function(req, res){
    res.send('Pogresili ste putanju.');
});


app.listen(port, function(){
    console.log("Aplikacija radi na portu "+port);
});