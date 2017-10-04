(function(){

    var app = {
        isTouchEnabled : false
    };

    // Test touch
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) { 
        
        app.isTouchEnabled = true;
        $('body').addClass('is-touch');
    }

    var $header = $('header.header');

    // Mobile Menu
    $('#mobile-nav-button').on('click', function(event){

        event.preventDefault();
        $header.toggleClass('open');
    });

    // LocationField
    $('.hero-search-field-location input').geocomplete({
        componentRestrictions: {
            'country': []
        }
    });

    // Dropdown definition
    var MNTDropdown = function(el){

        this.isOpen = false;
        this.padding = 24;
        this.minimumDelta = 190;
        this.$el = $(el);
        this.$dropdown = $('<div class="mnt-dropdown"/>');
        this.$cover = $('<div class="mnt-cover"/>');

        // Populate options
        var $options = $('option', this.$el);

        for ( var i = 0; i < $options.length; i++ ) {

            var $option = $options.eq(i);
            var $a = $('<a href="#" class="mnt-dropdown-option"/>');

            $a.text($option.text());
            $a.data('value', $option.val());
            $a.data('selected', $option.prop('selected'));

            if ( $a.data('selected') ) {

                $a.addClass('mnt-selected');
            }

            this.$dropdown.append($a);
        }

        this.close();
        this.$el.parent().append(this.$dropdown);
        this.$el.parent().append(this.$cover);

        // Setup cover
        this.$cover.css({

            'position' : 'absolute',
            'left' : 0,
            'top' : 0,
            'right' : 0,
            'bottom' : 0,
            'backgroundColor' : 'transparent'
        });

        // Setup bindings
        this.$cover.on("click", $.proxy(this.onCoverClick, this));
        $('.mnt-dropdown-option', this.$dropdown).on("click", $.proxy(this.onOptionClick, this));
        $('body').on("click", $.proxy(this.onBodyClick, this));

        MNTDropdown._register(this);
    };

    MNTDropdown.prototype = {

        onCoverClick : function(e) {

            e.preventDefault();
            e.stopPropagation();

            if ( this.isOpen ) {

                this.close();
            
            } else {

                this.open();
            }
        },

        onBodyClick : function(e) {

            if ( this.isOpen == false ) {

                return;
            }

            e.preventDefault();
            this.close();
        },

        onOptionClick :function(e) {

            e.preventDefault();
            this.val($(e.target).data('value'));
        },

        close : function() {

            this.$dropdown.css('display', 'none');
            this.$dropdown.css('height', 'auto');
            this.$dropdown.removeClass("mnt-dropdown-offset-top");
            this.$el.removeClass('mnt-dropdown-select-focus');
            this.isOpen = false;
        },

        open : function() {

            MNTDropdown._closeAll();

            var $window = $(window),
                scrollTop = $window.scrollTop(),
                coverTop = this.$cover.offset().top,
                dropdownHeight = this.$dropdown.outerHeight(),
                top = 0,
                distance = 0,
                delta = 0;

            distance = coverTop - scrollTop;
            top = distance + this.$cover.height();
            delta = $window.height() - top;

            if ( delta < this.minimumDelta - this.padding ) {

                this.$dropdown.addClass("mnt-dropdown-offset-top");

                if ( dropdownHeight > distance ) {

                   this.$dropdown.css('height', distance - this.padding);
                }

            } else if ( dropdownHeight > delta ) {

                this.$dropdown.css('height', delta - this.padding);
            }

            this.$dropdown.css('display', 'block');
            this.$el.addClass('mnt-dropdown-select-focus');
            this.isOpen = true;
        },

        val : function(set) {

            if ( set ) {

                this.$el.val(set);

                var $options = $('.mnt-dropdown-option', this.$dropdown),
                    $option = $options.filter(function() {
                        return $(this).data("value") == set;
                    });

                $options.removeClass("mnt-selected").data("selected", false);
                $option.addClass("mnt-selected").data("selected", true);
            }

            return this.$el.val();
        }
    }

    MNTDropdown._dropdowns = [];
    MNTDropdown._register = function(obj) {

        MNTDropdown._dropdowns.push(obj);
    };

    MNTDropdown._closeAll = function() {

        for ( var i = 0; i < MNTDropdown._dropdowns.length; i++ ) {

            MNTDropdown._dropdowns[i].close();  
        }
    };

    if ( app.isTouchEnabled == false ) {

        $('select').each(function(i, el){

            new MNTDropdown(el);
        });
    }

})();