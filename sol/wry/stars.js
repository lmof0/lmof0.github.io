// i'm thinking i'll let this be the one place in my website with constants. comfort pages. no mucking about with a billion and one different things for the title text to be or be able to do.
let current_time = Date.now();
let past_time = Date.now();
let start_time = 0; // beginning of the universe
let load_time = Date.now(); // not the beginning of the universe
let root = document.querySelector(":root"); // yes i do
let loop_switch = false;
let title_text = "";
let title_reveal_speed = 5;
/*document.getElementsByTagName("html")[0]*/document.getElementById("toggle-motion").addEventListener("click", (event)=>{
	loop_switch = !loop_switch;
	if (!loop_switch) {
		start_time += Date.now() - current_time; // eugh. feel free to change or change not <-- yes but this makes refreshes smooth !! but agh it breaks the nice starting behaviour, which you have to be at the start of the universe to witness..
		loop();
	}
});
function loop() {
	current_time = Date.now();
	
	let dt = current_time - past_time;
	let t = (current_time - start_time);
	let tea = current_time - load_time; // it's pronounced "tea time"
	let text = title_text.substr(0,1+Math.max(0,Math.floor((Math.log(tea/400)*title_reveal_speed)))); // waow :]
	let cursor = "&ensp;"; // cursory
	if (Math.floor(t)%1000 < 500) cursor = "_";
	document.getElementById("title").innerHTML = text + cursor;
	
	root.style.setProperty("--bg_x", Math.sin(Math.PI/4+t/17000)*200+"px");
	root.style.setProperty("--bg_y", -Math.cos(Math.PI/4+t/17000)*200+"px");
	root.style.setProperty("--galaxy_colour", "hsl("+(t/10)%360+", 100%, 50%)");
	
	past_time = Date.now();
	if (!loop_switch) {
		window.requestAnimationFrame(loop);
		//setTimeout(loop, 50);
	}
}
loop();

symbol_clusters = 0;
paragraphs = document.getElementsByTagName("p");
for (let i = 0; i < paragraphs.length; i++) {
	symbol_clusters += paragraphs[i].innerHTML.split(' ').length;
}
console.log("symbol clusters %c(like words but inaccurate)%c: "+symbol_clusters,"color:#777","color:#ccc");
document.getElementById("symbol-clusters").innerHTML = "symbol clusters (like words but inaccurate): "+symbol_clusters;

// i have just beautifully compartmentalized all of the css and js out to their own files because this is the first time i've needed to actually do that and i feel so proud of it right now

// the below todo has been solved. apparently it was window.requestAnimationFrame, somehow. actually it's still causing terrible problems and i'm very annoyed with it all
// todo : this could probably perform better. root.style.setProperty(every frame()) kinda yucky mayhaps ! look into it at some point mkay//?