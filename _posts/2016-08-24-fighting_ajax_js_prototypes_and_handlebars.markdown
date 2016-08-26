---
layout: post
title:  "Fighting Ajax: JS Prototypes and Handlebars"
date:   2016-08-24 15:55:23 -0400
---

When I first started injecting AJAX code into my rails recipe project, I felt much like Hector futily throwing a lance at Ajax, who then returns an impossibly large rock that nearly breaks my neck; however, after a few rounds, I now have a stronger understanding of AJAX. 

For this blog post, I will show you how to use ajax to request a specific recipe json, translate that json into a js object, and then render the js object's data on a show page, using a handlebars template, when the user clicks on the .js-nextRecipe button. 

First, you need to install handlebars. Handlebars is a javascript library that enables you to create dynamic templates for rendering js objects. Once, you have the handlebars library properlly included in your project, you may combine it with the power of AJAX. You may find the appropriate installation directions for your project here: [http://handlebarsjs.com/](http://) 

**Ruby/HTML Code for the Recipe Show Page**

Here is the ruby/html code for the recipe show page.

```
<div id ="recipeResults">
  <h1 class = "name"><%= @recipe.name %></h1>

  <h3>Content</h3>
    <%= @recipe.content %>

  <h3>Ingredients List</h3>
    <ul>
      <% @recipe.ingredients.each do |i| %>
        <li>Item: <%= i.item.name %> Quantity: <%= i.quantity%> <%= i.unit %></li>
      <%end%>
    </ul>

</div>

<p><button class= "js-next" data-id="<%=@recipe.id%>" type="button">Next Recipe</button></p>
```

It is important to include some kind of 'results' (recipeResults) container around your show data; this will make it easy for you to replace that information. The reason why I did not include the js-next button in the results container is because I wanted to be able to display the data of a single recipe on different views that do not include a next recipe button.

**Render a Recipe JSON**

Next, you need to render a recipe as a JSON. 

create a recipe_serializer: 

```
rails g serializer recipe
```

Here is the code for the recipe_serializer: 

```
class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :content
  has_many :ingredients
end
```

If your model has nested data, you need to include a 'has_many' association. Active Model serializers only use 'has_many' and 'has_one' associations, so don't try to use a 'belongs_to' association (I tried this; it broke my program). You do not need to create serializers for your nested data, unless you have more nested data you want access to in those child objects. For instance, ingredients had further nested info, so I needed to create another serializer:

```
class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :unit, :recipe_id, :item_id
  has_one :item
end
```

I wanted access to the respective item. This is only necessary if you have nested info two levels deep. In the recipes controller, I included this code to render my recipe json:

```
def show
  @recipe = Recipe.find_by(id: params[:id])
      respond_to do |format|
        format.html {render :show}
        format.json {render json: @recipe}
    end
```

The respond_to block is basically saying that it will return json or html depending on the request. When I go to the route: http://localhost:3000/recipes/2.json, I get the json for the recipe with the id 2. When I visit http://localhost:3000/recipes/2, the show action renders the html show view.

**Using AJAX to retrieve recipe JSON **

I will now move to my recipe.js file to write in the necessary js code. Remember to include the recipe.js file in your view show page! 

First, I added an event listener to the js-next button.

```
$(function () { // <- this is shorthand for document.ready
  $(".js-next").on("click", Recipe.nextRecipe)
```

 When the user clicks on the .js-next button, js calls Recipe.nextRecipe: 

```
Recipe.nextRecipe = function() {
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
      $.get("/recipes/" + nextId + ".json", function(data) {

      });
    }

```

Since the js-next button is dynamic, I needed to make sure that I retrieved the correct recipe. In order to get the right recipe, I needed to get the correct id. If you look back at the show page, you will see that I included the current recipe's id in the data-id attribute: 

```
<p><button class= "js-next" data-id="<%=@recipe.id%>" type="button">Next Recipe</button></p>
```

Thus, using this id, I can get the next recipe's json by adding 1 to it. Using $.get, a higher level AJAX request, I can get the recipe json. In theory, I could use this data and display it as html, but this could get messy if you plan on including a lot of html tags. Also the recipe has nested data that is two levels deeps. 

**Translating Recipe JSON into JS object**

I included the js syntax used to create a js object in my function:

```
Recipe.nextRecipe = function() {
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
      $.get("/recipes/" + nextId + ".json", function(data) {
           var recipe = new Recipe(data["recipe"]);
      });
    }
```

data["recipe"] is the JSON recipe that will be passed through the Recipe constructor as a parameter when an object is being created. You can assign the object's attributes to the same values as the JSON's attribues:

```
function Recipe(attributes) {
  this.name = attributes.name;
  this.content = attributes.content;
  this.id = attributes.id;
  this.ingredients = attributes.ingredients;
}
```

**Using a handlebars template to render a JS object**

First, I needed to include a handlebars template in my recipe show view:

```
<script id="recipe-template" type="text/x-handlebars-template">
  <h1>{{name}}</h1>

  <h3>Content</h3>
    <p>{{content}}</p>

  <h3>Ingredients List</h3>
    {{#list ingredients}}
    <strong>Item:</strong> {{item.name}} <strong>Quantity:</strong> {{quantity}} {{unit}}{{/list}}

</script>
```

It is important to note the syntax. You need to assign it an 'id' and then specify the 'type', so it knows that it is a handlebars template. Everything in {{}} will be replaced by the respective JS object's attribute. I will tackle the ingredients list later.

Now, in my Recipe.nextRecipe function, I added this bit of code:

```
Recipe.templateSource = $('#recipe-template').html() // This sets the source of the template using the template's id
Recipe.template = Handlebars.compile(Recipe.templateSource); // Handlebars compiles the given template
var recipe = new Recipe(data["recipe"]); // creates JS Recipe object
var recipeDisplay = recipe.renderDisplay() 
 $('#recipeResults').html(recipeDisplay) // displays the return value of recipeDisplay in the handlebars template 
```

What exactly is the return value sent to the template? I was surprised by its simplicity:

```
Recipe.prototype.renderDisplay = function() {
  return Recipe.template(this) 
}
```

'this' is referring to the recipe's object. Handlebars will figure out how to inject the appropriate values into the dynamic curly braces: {{}}. This works perfectly for inserting the recipe's name and content, which is only one level deep. 

However, you need to add some extra code if you have dynamic nested data. For instance, one recipe might have two ingredients, while another recipe has ten ingredients. Handlebars uses helper methods to deal with nested variable data. First, I'll explain the template portion in the show view:

```
  <h3>Ingredients List</h3>
    {{#list ingredients}}
    <strong>Item:</strong> {{item.name}} <strong>Quantity:</strong> {{quantity}} {{unit}}
		{{/list}}
```

The # signals to hashbar that you are calling a handlebars helper for 'list'. 'ingredients' is what is being passed onto the Handlebars helper that I included in recipe.js:

```
Handlebars.registerHelper('list', function(ingredients, options) {
  var out = "<ul>";
  for(var i=0, l=ingredients.length; i<l; i++) {
    out = out + "<li>" + options.fn(ingredients[i]) + "</li>";
  }
  return out + "</ul>";
});
```

The handlebars helper accepts, as its parameters, the name of where you you are calling the helper in your recipe template, the ingredients array, and the variable options (or attributes of the ingredients). It uses a for loop to iterate through each ingredient. The .fn is a handlebars function that enables the handlebars template in the view to access whatever options(or attributes) are available in the specific ingredient.

**Finale**

For the last bit of Recipe.nextRecipe, I included this bit of code:

```
        $(".js-next").attr("data-id", recipe["id"]);
```

This replaces the "data-id" attribute of the .js-next button with the current recipe's id, so next time you click on the button, it takes you to the next recipe.

Phew! That was a lot, but I learned a a tremendous amount from this experience. I think most importantly, I gained a new respect for AJAX and handlebars.


Rails Recipe Project Link: [https://github.com/nscarlyon/rails-recipe-project](http://)

