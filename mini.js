console.log("searchAnime() triggered");

async function searchAnime() {
    const animeName = document.getElementById("animeinput").value;
    const result = await fetch(`https://localhost:3000/search?anime=${encodeURIComponent(animeName)}`);
    const data = await result.json();
    const anime = data.results[0];


    if (!anime) {
        document.getElementById("results").innerText = "Anime not found.";
        return;
    }

    document.getElementById("results").innerHTML = `
        <div class="js-div">
            <h2 class="js-heading">${anime.title}</h2>
            <img src="${anime.images.jpg.image_url}" width="150px" class="js-img">
            <p class="js-ep">Episodes: ${anime.episodes}</p>
            <p class="js-sco">Score: ${anime.score}</p>
            <p class="js-status">Status: ${anime.status}</p>
            <p class="js-air">Aired: ${anime.aired.string}</p>
            <p class="js-type">Type: ${anime.type}</p>
            <p class="js-gen">Genre: ${anime.genres.map(genre => genre.name).join(", ")}</p>
            <p class="js-rating">Rating: ${anime.rating}</p>
            <p class="js-url">URL: <a href="${anime.url}" target="_blank">${anime.url}</a></p>
             <p class="js-ep-detail">Synopsis: ${anime.synopsis}</p>
        </div>
    `;


    const animeId = anime.mal_id;

    // Fetch recommendations
    const recRes = await fetch(`http://localhost:3000/recommendations?animeId=${animeId}`);
    const recData = await recRes.json();
    let recHTML = "<ul class=r-section>";
    recData.recommendations.forEach(rec => {
        recHTML +=`<li class="js-list">
            <strong>${rec.entry.title}</strong><br>
            <img src="${rec.entry.images.jpg.image_url}" width="100"><br>
            <a class="r-link" href="https://myanimelist.net/anime/${rec.entry.mal_id}" target="_blank">More Info</a>
        </li>`
    });
    
    recHTML += "</ul>";
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   })
    document.getElementById("results").innerHTML += recHTML;
}
// Ensure jQuery is loaded before this script in your HTML:
// <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

$(document).ready(function() {
    const $input = $("#animeinput");
    const $button = $("#searchbtn"); 
    if ($input.length && $button.length) {
        $input.on("keydown", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                $button.click();
                 $(this).siblings("#text-show").slideDown();
            }
        });
    } else {
        console.error("animeinput or searchbtn element not found in the DOM.");
    }
      $(document).on('click','button',function(){
           $(this).siblings("#text-show").slideDown();
      });
    $(document).on('click','.btn',function(){
        $('html,body').animate({scrollTop:0},'slow');
    });
});
