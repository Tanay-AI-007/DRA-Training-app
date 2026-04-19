// Quiz logic
console.log("Quiz stub loaded.");

// TODO: Connect test questions fetching from Supabase and score calculation.

document.addEventListener("DOMContentLoaded", () => {
    // Simple UI interaction for the option buttons
    const options = document.querySelectorAll(".option-btn");
    options.forEach(btn => {
        btn.addEventListener("click", () => {
            options.forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");
        });
    });
});
