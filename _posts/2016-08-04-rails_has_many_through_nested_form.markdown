---
layout: post
title:  "Rails has_many :through nested form"
date:   2016-08-04 18:00:29 +0000
---


Creating this nested form was like navigating through a labrynth. I scoured countless google pages, and by bits and pieces, I was able to find the exit. In case if anybody has a similar issue to mines, I will save that person from the trouble I went through. Here is a walkthrough of how I designed my nested form.

***I only included relevant code to better explain how nested forms are created. 

I have four different models:

```
class User < ApplicationRecord
.....

  has_many :recipes

........

end
```

The user has many recipes. Each recipe has a foreign key user_id.

```
class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, inverse_of: :recipe
  has_many :items, through: :ingredients

  validates_presence_of :name

  accepts_nested_attributes_for :ingredients

end

```

The recipe belongs to a user through a foreign key user_id. Recipe also has a 'name' attribute. The recipe can have many ingredients because each ingredient has a foreign key recipe_id. It is essential to establish the 'inverse_of' relationship. Since recipe has nested attributes for ingredients, you want to be able to automatically build an association like recipe.ingredients even when recipe has not yet persisted (enter the database). This will make a little more sense later when I get to the form.

```
class Ingredient < ApplicationRecord
  belongs_to :item
  belongs_to :recipe

  validates :quantity, presence: true

  def item_attributes=(item_attributes)
    item_attributes.values.each do |item_attribute|
      if item_attribute != ""
      new_item = Item.find_or_create_by(name: item_attribute)
      self.item = new_item
    end
  end
end

end
```

The ingredient obect has both item and recipe foreign key. It also has a custom item_attributes writer because item is nested under ingredient. The purpose of the custom writer is to make sure that the user isn't creating duplicate item objects or blank item objects.


```
class Item < ApplicationRecord
  has_many :ingredients
  has_many :recipes, through: :ingredients

  validates :name, presence: true
end
```

The item is associated with ingredients because ingredients has an item_id forein key. 

Now, onto the form:

```
<%= form_for @recipe do |f|%>

<% if @recipe.errors.any? %>
<div class="error_explanation">
  <h2><%= pluralize(@recipe.errors.count, "error") %> prevented this record from being saved:</h2>
  <ul>
  <% @recipe.errors.full_messages.each do |msg| %>
    <li><%= msg %></li>
  <% end %>
  </ul>
</div>
<% end %>

<%= f.label "Name:" %>
<%= f.text_field :name %><br>
<%= f.hidden_field :user_id, value: @user.id %>

<%= f.fields_for :ingredients, @recipe.ingredients.build do |ingredients_form| %>
<%= ingredients_form.label "Quantity:" %>
<%= ingredients_form.text_field :quantity %><br>

<%= ingredients_form.fields_for :item, @recipe.ingredients.build.build_item do |item_form| %>
 <%= item_form.label "Item Name:" %>
  <%= item_form.text_field :name %><br>

<% end %>
<%end%>

<%= f.submit %><br>
<%end%>
```

The first part of the form outputs any validation errors. I used a form_for helper to create a form based on a new recipe object that has yet to be persisted. The user can enter a name for the recipe. There is a hidden user_id field tag, so the new recipe can be associated with the user. Since recipe accepts nested attributes for ingredients, we can include a nested form for ingredients. @recipe.ingredients.build is an important piece of code. This essentially starts a new collection of ingredients for the associated recipe, even though recipe is currently an invalid object. This piece of code works because in the Recipe model, we specified that the ingredients is the inverse_of recipe. The inverse_of association enables a relationship between the two even if both are invalid objects and have yet to be persisted into the database. Furthermore, this also enables a new item to be associated with ingredients. To clarify, inverse_of will reference the objects from memory instead of the database (where it does not exist). If you do not include the inverse_of, the form will be seeking the associated objects from the database. 

Here is the Recipe controller:

```
  def new
    @user = current_user
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.valid?
      @recipe.save
      redirect_to @recipe, notice: "Recipe successfully created."
    else
      @user = current_user
      render action: 'new'
    end
  end
```

You need to set the @user variable, so you can pass the user_id for the recipe object. You also need to create a new recipe object for the form to act on. 

In the Create action, a recipe is created based on the params passed to it from the form. If the new object is valid, it will be persisted into the database and the user will be redirected. If it is not valid, the form will be re-rendered. This is a very important step. At first, I tried redirecting the user to the new form page, but when I did that, none of the validation errors showed. This is because in the new action, a new recipe is being created. Error validations only occur for objects that tried to persist. In order for the validation errors to show, you must use the current, invalid recipe object. The user variable has to be reset, since actions are stateless.

One last bit of code:

```
  def recipe_params
   params.require(:recipe).permit(:name, :user_id,
   ingredients_attributes: [:id, :quantity, item_attributes: [:name]])
  end
```

This is how we retrieve the data from the form and pass it onto the create action. It passes the name of the recipe, the hidden user_id, and the ingredients_attributes, which has an id, quantity, and nested item_attributes. All of this data is nested under recipe. 

It took some time to google the correct things to find the answer, but the quest helped solidify my understanding of associations and the differences between build/new and create. 
