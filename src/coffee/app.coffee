$ = jQuery

$ ->
    # document ready code in here

    # silly sample code to change background color on click
    colors = ['#f99', '#9f9', '#99f', '#ff9', '#f9f', '#9ff']
    counter = parseInt(Math.random() * colors.length)
    getBg = ->
        counter = if counter < colors.length - 1 then counter + 1 else 0
        colors[counter]

    $('body').on 'click', ->
        $('html,body').css 'background-color', getBg()
    .click()
