---
layout: post
title:  "Infidels! You have touched the forbidden treasure!!!"
date:   2016-06-28 04:48:50 +0000
---

When I first started reading about Ruby gems, I immediately thought of the gem in the scene from the Disney movie - Alladin: 


<center><iframe width="420" height="315" src="https://www.youtube.com/embed/BRjTMsDyEU0" frameborder="0" allowfullscreen></iframe></center>

Like Abu, I wanted the forbidden Ruby gem. At first, the code seemed like a forbidden treasure. Try as I might, I could not touch it. I could not find the missing lines that would make my code complete. 

I should first explain the purpose of my Ruby gem: Regal Now Playing CLI Gem. This gem provides the user a list of movies that are currently playing at my local theater, Regal Medlock Crossing Stadium 18 & RPX. When the user selects a specific movie by number, it outputs the movie title, genre, rating, runtime, and showtimes for the current day. The data was scraped from this website: http://www.fandango.com/regalmedlockcrossingstadium1826rpx_aamem/theaterpage

Prior to starting this project, I thought the hardest part would be finding the correct element to scrape. I was wrong. It was difficult, but I would say that I spent the most time trying to format the scraped data and encapsulate it in the simplest code possible. I wanted my gem to be elegant, so I racked my brain trying to find ways to make it look beautiful. After hours of work, I realized that I needed to stop striving for beauty. I needed to get working code first. This realization made things move faster. The trick was to get the CLI to output presentable data first a little at a time. 

For instance, I first wrote this beast here:

```
doc =   Nokogiri::HTML(open("http://www.fandango.com/regalmedlockcrossingstadium1826rpx_aamem/theaterpage"))
    genres = []
    genre = doc.css("div.showtimes-movie-genre").map(&:text)
      genre.each_with_index { |g, num|
        gen = {num: g}
        genres << gen
      }
 
  titles.each_with_index do |t, i|
   puts "#{i}. #{t}"
   puts "#{genres[i].values.join.gsub(/\W{3,}/, " ")}"
  end
```


I just wanted to output the list of movie titles and see if I could also put out the genre for each movie. I was able to accomplish that with the ugly code. By writing ugly code first, I was able to get a clearer picture of what my code was accomplishing. It was like looking at a blueprint. I was then able to simply the code a bit:

```
  def doc
    @doc = Nokogiri::HTML(open("http://www.fandango.com/regalmedlockcrossingstadium1826rpx_aamem/theaterpage"))
  end

def genre
  @genre ||= doc.css("div.showtimes-movie-genre")[index].text.gsub(/\W{3,}/, " ")  #This code is in movie.rb
 end
  
 puts "Genre: #{movies.genre}"   #This code is in CLI.rb 
```

  
This code is a lot more readable and flexible. I have a movie file that initialized with the instance variable - index - inputted by the user. The genre variable uses this index variable to return the genre for a specific movie. By making the index a variable along with the doc html page, I avoided having to iterate over all the data or creating hash tags. Furthermore, I moved all the outputs in the CLI. Whereas before, all of my code was pretty much jumbled up in one file. It helped a lot to have all the code in one place, so I could get it to work quickly; plus, it was less confusing. Once, it was all working, I was able to move the code around.
  
This project was a great learning experience. It taught me that when you start working on a big project like this, you first need to envision what you want your code to produce, write working code, and then refactor bit by bit.

~
