$(function () {
        $(document).on('click', 'a[class="pagination"]', function () {
                $.get(this.href, null, null, 'script');
                return false;
        });
});