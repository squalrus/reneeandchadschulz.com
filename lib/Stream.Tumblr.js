/**
 * Tumblr API for chadschulz.com
 */
 ActivityStream.prototype.tumblr = function( username, avatar ){

    // Variables
    var   url = 'http://' + username + '.tumblr.com/api/read/json'
        , updateStream
        , formatTumble
        ;

    /**
     * Parse items and convert to stream items
     */
    updateStream = function( data ){
        var data = data.posts;

        for( var i = 0; i < data.length; i++ ){
            var date = new Date( data[i].date );

            this.stream.push( new ActivityItem( date, '<div class="activity-entry"><div class="activity-content">' + formatTumble( data[i] ) + '<span class="date">' + data[i].date + '</span></div></div>' ) );
        }
    };

    formatTumble = function( data ){
        var tumbleContent = "<div class='avatar' style='background: url(" + avatar + ")'></div>";

        switch( data.type ){

            case 'regular':
                // FIXED
                tumbleContent += '<h4>' + data['regular-title'] + '</h4>' + ' ' + data['regular-body'];
                break;

            case 'photo':
                // FIXED!
                tumbleContent += "<img src='" + data["photo-url-1280"] + "' class='tumblr-image' />" + data["photo-caption"];
                break;

            case 'quote':
                // Not used yet
                tumbleContent += 'type: quote';;
                break;

            case 'link':
                // FIXED!
                tumbleContent += "<h4>" + data["link-text"] + "</h4>" + "<p><a href='" + data["link-url"] + "' target='_blank'>" + data["link-text"] + "</a></p>" + data["link-description"];
                break;

            case 'chat':
                // Not used yet
                tumbleContent = 'type: chat';
                break;

            case 'audio':
                // Not used yet
                tumbleContent = 'type: audio';
                break;

            case 'video':
                // Not used yet
                tumbleContent = 'type: video';
                break;
        }

        return tumbleContent;
    };

    return $.ajax({
          url: url
        , dataType: 'jsonp'
        , success: function( data, status ){
            updateStream( data );
        }
    });

};