/*
    Real Time Polling Application
    client.js
    Jacky Tea
    19/07/19
*/

//globals
var value = "";

//onclick set and get value
setSelectionValue = (value) => {
    this.value = value;
}

getSelectionValue = () => {
    return this.value;
}

//submission form
const form = document.getElementById("form");
form.addEventListener('click', (event) => {
    //user vote
    //const selection = document.querySelector('.form-option input[name=framework]:checked').value;
    const selection = getSelectionValue();
    const data = { framework: selection };

    //post request
    fetch("", {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

        //prevent default form functionaility
    event.preventDefault();
});

//fetch database records as get request
fetch("")
    .then(res => res.json())
    .then(data => {

    //catagorize votes into their respective catagories
    const votes = data.votes;
    const catagories = votes.reduce((accumulator, vote) => ((accumulator[vote.framework] = (accumulator[vote.framework] || 0) + parseInt(vote.score)), accumulator), {});

    //vote counter
    var voteCount = votes.length;
    document.getElementById("vote-counter").innerHTML = "Votes: " + voteCount;

    //default points
    if(votes.length === 0) {
        catagories.VanillaJS = 1;
        catagories.Angular = 0;
        catagories.React = 0;
    }

    //data points on the graph
    let coordinates = [
        { label: "VanillaJS", y: catagories.VanillaJS },
        { label: "Angular", y: catagories.Angular },
        { label: "React", y: catagories.React },
    ];

    //render the CanvaJS graph
    const graph = document.getElementById("graph");
    if (graph) {

        CanvasJS.addColorSet("iconColors", ["#f0db4f", "#e23237", "#00d8ff"]);

        const canvasJS = new CanvasJS.Chart("graph", {
            fontweight: "bold",
            colorSet: "iconColors",
            animationEnabled: true,
            animationDuration: 300,
            theme: "theme1",
            title: {
                text: ``
            },
            data: [
                {
                    type: "pie",
                    startAngle: 30,
                    indexLabelFontSize: 17,
                    indexLabel: "{label} - #percent%",
                    dataPoints: coordinates
                }
            ]
        });

        canvasJS.render();

        Pusher.logToConsole = true;

        //push data to database and Pusher API for real time updates
        var pusher = new Pusher('', {
            cluster: 'us2',
            forceTLS: true
        });

        var channel = pusher.subscribe('os-framework');
        channel.bind('os-choice', (data) => {
            coordinates = coordinates.map((score) => {
                if (score.label == data.framework) {
                    score.y += data.score;
                    return score;
                } else {
                    return score;
                }
            });
            document.getElementById("vote-counter").innerHTML = "Votes: " + ++voteCount;
            canvasJS.render();
        });
    }
}).catch((err) => {
    console.log(err);
});


