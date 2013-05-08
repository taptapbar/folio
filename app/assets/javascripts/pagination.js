$(function () {
        $(document).on('click', 'a[class="pagination"]', function () {
                var link = this.href;
                $(this).remove();
                $.get(link, null, null, 'script');
                return false;
        });
});