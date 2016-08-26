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
