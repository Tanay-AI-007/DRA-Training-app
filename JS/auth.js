// Auth UI Logic
console.log("Auth stub loaded: Handles login, register, getting access code");

// TODO: Connect to window.supabase.auth.signInWithPassword etc.
document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            // Placeholder: Let the default action (page redirect) happen for the UI demo.
            console.log("Form submitted. Normally we would e.preventDefault() and call Supabase.");
        });
    });
});
