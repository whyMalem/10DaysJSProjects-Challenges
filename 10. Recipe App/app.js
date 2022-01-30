const mealElement = document.querySelector(".meals");
const favMeals = document.querySelector(".fav-meals");
const mealInfo = document.querySelector(".meal-info");
const popup = document.querySelector(".popup-container");
const popupBtn = document.querySelector(".close-btn");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const mealData = respData.meals[0];

  addMeal(mealData, true);
}

async function getMealsById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();
  const meal = respData.meals[0];

  return meal;
}

async function getMealsBySearch(userInput) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput
  );
  const respData = await resp.json();
  if (respData) {
    const meal = respData.meals[0];

    return meal;
  }
}

searchBtn.addEventListener("click", async () => {
  mealElement.innerHTML = "";
  const userInput = search.value;
  const mealData = await getMealsBySearch(userInput);
  // const meals = await mealData;

  if (mealData) {
    [mealData].forEach((meal) => {
      addMeal(meal);
    });
  }
});

function addMeal(mealData, random = false) {
  //   console.log(mealData);
  //   console.log(mealData.meals[0].strMealThumb);
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? `<span class="random">Random Recipe</span>` : ""}
      <img
        src="${mealData.strMealThumb}"
        alt="${mealData.strMeal}"
      />
    </div>

    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <button class="fav-btn"><i class="fas fa-heart"></i></button>
    </div>
    `;

  const btn = meal.querySelector(".fav-btn");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (btn.classList.contains("active")) {
      removeLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addLS(mealData.idMeal);
      btn.classList.add("active");
    }

    fetchFavMeals();
    // console.log(btn.classList.contains("active"));
  });

  meal.addEventListener("click", (e) => {
    e.stopPropagation();
    showMealInfo(mealData);
  });

  mealElement.appendChild(meal);
}

function addLS(mealId) {
  console.log(mealId);
  const mealsId = getMealsLS();
  localStorage.setItem("mealIds", JSON.stringify([...mealsId, mealId]));
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));

  return mealIds === null ? [] : mealIds;
}

function removeLS(mealId) {
  const mealIds = getMealsLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id != mealId))
  );
}

async function fetchFavMeals() {
  favMeals.innerHTML = "";

  const mealsId = getMealsLS();

  for (let i = 0; i < mealsId.length; i++) {
    const mealId = mealsId[i];
    let meal = await getMealsById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
  <img
  src="${mealData.strMealThumb}"
  alt="${mealData.strMeal}"
/>
<span>${mealData.strMeal}</span>
<button class="close-btn">
  <i class="fas fa-times"></i>
</button>
`;

  const closeBtn = favMeal.querySelector(".close-btn");
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    removeLS(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.addEventListener("click", (e) => {
    e.stopPropagation();
    showMealInfo(mealData);
  });

  favMeals.appendChild(favMeal);
}

function showMealInfo(mealData) {
  mealInfo.innerHTML = "";

  const mealEl = document.createElement("div");

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]}  - ${mealData["strMeasure" + i]}`
      );
    }
  }

  mealEl.innerHTML = `
  <h1>${mealData.strMeal}</h1>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
            <p>
              ${mealData.strInstructions}
            </p>
            <h3>Ingredients:</h3>
            <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
            </ul>
  `;

  mealInfo.appendChild(mealEl);
  popup.classList.remove("hidden");
}
popupBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
});
