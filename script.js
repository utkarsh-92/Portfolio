document.addEventListener('mousemove', function(e) {
    let cursor = document.getElementById('cursor');
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.id = 'cursor';
        cursor.style.width = '10px';
        cursor.style.height = '10px';
        cursor.style.backgroundColor = 'black';
        cursor.style.borderRadius = '50%';
        cursor.style.position = 'absolute';
        cursor.style.pointerEvents = 'none';
        document.body.appendChild(cursor);
    }
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});