# The Decision Room

A minimalist web application designed to bring clarity to your toughest choices by quantifying your gut feeling.



## What is This?

The Decision Room is a tool that helps you navigate difficult binary decisions (Choice A vs. Choice B). Instead of getting lost in an endless loop of pros and cons, this app introduces a powerful psychological metric: the fear of future regret. By forcing you to confront which outcome you'd regret missing out on the most, the app helps reveal the path your intuition is already leaning toward.

---

## The "Law of Regrets" Algorithm

The core logic of this application is deceptively simple and is based on a concept I call the "Law of Regrets."

**The Philosophy:** When faced with two appealing options, the choice that would cause more regret if **not** taken is often the one you truly desire. This "regret potential" is a powerful proxy for your underlying passion and emotional investment.

**How It Works in the App:**

1.  **Define Choices:** The user inputs their two choices (e.g., "Take Job in City A" vs. "Start My Own Business").
2.  **List Pros & Cons:** The user lists the logical arguments for and against each choice. This helps to externalize and organize their thoughts.
3.  **Quantify Regret:** For each choice, the user answers a critical question on a scale of 1 to 10:
    > "How much would you regret **NOT** choosing this?"
4.  **The Calculation:** The algorithm simply compares the two regret scores.
    * A high score for "Job in City A" (e.g., 9/10) signifies a deep fear of missing that opportunity.
    * A lower score for "Start My Own Business" (e.g., 4/10) signifies that while appealing, the user would be more at peace with letting that opportunity pass.
5.  **The Recommendation:** The app recommends the choice with the **higher regret score**. This is the path the user has demonstrated a stronger subconscious desire to protect from loss.

In Phase 2, this numerical score is combined with the pros and cons text, which is sent to a Generative AI (Google's Gemini) for a more nuanced, qualitative analysis that complements the core algorithm.

---

## Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **AI:** Google Gemini API
* **Database (Planned):** MongoDB