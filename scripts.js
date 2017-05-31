// Using this polyfill for safety.
Element.prototype.hasClassName = function(name) {
  return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function(name) {
  if (!this.hasClassName(name)) {
    this.className = this.className ? [this.className, name].join(' ') : name;
  }
};

Element.prototype.removeClassName = function(name) {
  if (this.hasClassName(name)) {
    var c = this.className;
    this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
  }
};


var samples = samples || {};

// dragStart
(function() {
  var id_ = 'columns-dragStart';
  var cols_ = document.querySelectorAll('#' + id_ + ' .column');

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', 'blah'); // needed for FF.

    // Target element (this) is the source node.
    this.style.opacity = '0.4';
  };

  [].forEach.call(cols_, function (col) {
    // Enable columns to be draggable.
    col.setAttribute('draggable', 'true');
    col.addEventListener('dragstart', this.handleDragStart, false);
  });

})();

// dragEnd
(function() {
  var id_ = 'columns-dragEnd';
  var cols_ = document.querySelectorAll('#' + id_ + ' .column');

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML); // needed for FF.

    // Target element (this) is the source node.
    this.style.opacity = '0.4';
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
    this.addClassName('over');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.
    this.removeClassName('over');
  };

  this.handleDragEnd = function(e) {
    [].forEach.call(cols_, function (col) {
      col.removeClassName('over');
    });

    // target element (this) is the source node.
    this.style.opacity = '1';
  };

  [].forEach.call(cols_, function (col) {
    // Enable columns to be draggable.
    col.setAttribute('draggable', 'true');
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
  });

})();

// dragIcon
(function() {
  var id_ = 'columns-dragIcon';
  var cols_ = document.querySelectorAll('#' + id_ + ' .column');

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    var dragIcon = document.createElement('img');
    dragIcon.src = '/static/images/google_logo_small.png';
    e.dataTransfer.setDragImage(dragIcon, -10, -10);

    // Target element (this) is the source node.
    this.style.opacity = '0.4';
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.

    this.removeClassName('over');
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.

    this.style.opacity = '1';

    [].forEach.call(cols_, function (col) {
      col.removeClassName('over');
    });
  };

  [].forEach.call(cols_, function (col) {
    // Enable columns to be draggable.
    col.setAttribute('draggable', 'true');
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
  });

})();

// Almost final example
(function() {
  var id_ = 'columns-almostFinal';
  var cols_ = document.querySelectorAll('#' + id_ + ' .column');
  var dragSrcEl_ = null;

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    dragSrcEl_ = this;

    this.style.opacity = '0.4';

    // this/e.target is the source node.
    this.addClassName('moving');
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
    this.addClassName('over');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.

    this.removeClassName('over');
  };

  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if we're dropping on the same column we're dragging.
    if (dragSrcEl_ != this) {
      dragSrcEl_.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    this.style.opacity = '1';

    [].forEach.call(cols_, function (col) {
      col.removeClassName('over');
      col.removeClassName('moving');
    });
  };

  [].forEach.call(cols_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
  });
})();

// Full example
(function() {
  var id_ = 'columns-full';
  var cols_ = document.querySelectorAll('#' + id_ + ' .column');
  var dragSrcEl_ = null;

  this.handleDragStart = function(e) {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);

    dragSrcEl_ = this;

    // this/e.target is the source node.
    this.addClassName('moving');
  };

  this.handleDragOver = function(e) {
    if (e.preventDefault) {
      e.preventDefault(); // Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
  };

  this.handleDragEnter = function(e) {
    this.addClassName('over');
  };

  this.handleDragLeave = function(e) {
    // this/e.target is previous target element.
    this.removeClassName('over');
  };

  this.handleDrop = function(e) {
    // this/e.target is current target element.

    if (e.stopPropagation) {
      e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if we're dropping on the same column we're dragging.
    if (dragSrcEl_ != this) {
      dragSrcEl_.innerHTML = this.innerHTML;
      this.innerHTML = e.dataTransfer.getData('text/html');

      // Set number of times the column has been moved.
      var count = this.querySelector('.count');
      var newCount = parseInt(count.getAttribute('data-col-moves')) + 1;
      count.setAttribute('data-col-moves', newCount);
      count.textContent = 'moves: ' + newCount;
    }

    return false;
  };

  this.handleDragEnd = function(e) {
    // this/e.target is the source node.
    [].forEach.call(cols_, function (col) {
      col.removeClassName('over');
      col.removeClassName('moving');
    });
  };

  [].forEach.call(cols_, function (col) {
    col.setAttribute('draggable', 'true');  // Enable columns to be draggable.
    col.addEventListener('dragstart', this.handleDragStart, false);
    col.addEventListener('dragenter', this.handleDragEnter, false);
    col.addEventListener('dragover', this.handleDragOver, false);
    col.addEventListener('dragleave', this.handleDragLeave, false);
    col.addEventListener('drop', this.handleDrop, false);
    col.addEventListener('dragend', this.handleDragEnd, false);
  });
})();

$(".fancybox").fancybox({
    // API options 
    autoScale: false,
    type: 'iframe',
    padding: 0,
    closeClick: false
});
