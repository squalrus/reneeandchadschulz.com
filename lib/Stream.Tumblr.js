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

            this.stream.push( new ActivityItem( date, '<div class="activity-entry"><div class="activity-content">' + formatTumble( data[i] ) + '<span class="date">' + date + '</span></div></div>' ) );
        }
    };

    formatTumble = function( data ){
        var tumbleContent = '<img class="avatar" src="' + avatar + '" height="35" width="35" />';

        switch( data.type ){

            case 'regular':
                tumbleContent += '<h4>' + data['regular-title'] + '</h4>' + ' ' + data['regular-body'];
                break;

            case 'photo':
                tumbleContent += '<h4>' + data['photo-caption'] + '</h4>' + ' <img src="' + data['photo-url-500'] + '" />';
                break;

            case 'quote':
                tumbleContent += '<p>"' + data['quote-text'] + '"</p>' + '<p> - ' + data['quote-source'] + '</p>';
                break;

            case 'link':
                tumbleContent += '<h4>' + data['link-url'] + '</h4>' + data['link-description'];
                break;

            case 'chat':
                tumbleContent = 'type: chat';
                break;

            case 'audio':
                tumbleContent = 'type: audio';
                break;

            case 'video':
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