---
layout: post
title:  "Deploying Rails App on Heroku"
date:   2016-10-15 17:42:33 -0400
---

When I first tried to deploy a Rails app on Heroku, there were some road blocks. Fortunately, through some googling and help from a hero, I was able to deploy multiple apps for my portfolio. Here are the steps:

**Prerequisites**

Heroku has excellent step by step instructions on installing the Heroku CLI, or known formerly as the Heroku Toolbelt. The Heroku Toolbelt will allow you to type in Heroku commands in your terminal.

[Getting Started on Heroku with Ruby](https://devcenter.heroku.com/articles/getting-started-with-ruby#introduction)

**Deploy the app**

If you are at this stage, I am assuming that you already have the Heroku Toolbelt successfully installed. To deploy the Heroku app, you need to follow these steps(in the same directory as your app):

1. `heroku create` (this will create a new git heroku remote and associated it with your local git repo; heroku will create a Japanese sounding name for your app or you can pass in your own name as a parameter)

2. `git push heroku master`

3. `heroku open` (open your app in the browser at the heroku link)

If everything went well, you can sit back and admire your beautiful work. You don't even need to bother reading the rest of this post!=) However, if you are curious or you encountered some problems during this stage...

**Aggghhhh!**

Personally, there were three different issues I encountered while trying to deploy my heroku app:

1. There seemed to be an issue with my assets. I ran these commands, and it fixed my problem:

`rake assets:clobber`
`rake assets:precompile`

2. You did not run your database! Run in terminal:

`heroku run rake db:migrate`
`heroku run rake db:seed` (if you have any seed data)

3. Heroku does not like sqlite. Place in Gemfile:

```
gem 'sqlite3', :group => [:development, :test]
group :production do
  gem 'thin'
  gem 'pg'
end
```

You can read more about why Heroku prefers to use 'pg'(PostgresSql) over 'sqlite'. [here](https://devcenter.heroku.com/articles/sqlite3)

**Final Thoughts**

It was fun figuring out how to get around these issues. I am sure I will encounter some more in the future.=)
