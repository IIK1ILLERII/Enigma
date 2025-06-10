document.addEventListener('DOMContentLoaded', () => {
    // --- Sidebar Navigation Functionality ---
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentPanes = document.querySelectorAll('.content-pane');

    sidebarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Handle active state for sidebar items
            sidebarItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            // Handle content pane visibility
            const targetContentId = item.dataset.content; // Get content ID from data-content attribute
            contentPanes.forEach(pane => pane.classList.remove('active'));
            const targetPane = document.getElementById(targetContentId);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            // If it's a submenu item, ensure its parent is expanded
            if (item.closest('.submenu')) {
                const parentHasSubmenu = item.closest('li').parentElement.previousElementSibling;
                if (parentHasSubmenu && parentHasSubmenu.classList.contains('has-submenu')) {
                    parentHasSubmenu.classList.add('expanded');
                    parentHasSubmenu.nextElementSibling.classList.add('active');
                }
            }

            // Close sidebar on mobile after clicking an item
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                    document.body.classList.remove('no-scroll'); // Remove body scroll lock
                }
            }
        });
    });

    // --- Submenu Toggle Functionality ---
    const hasSubmenuItems = document.querySelectorAll('.sidebar-item.has-submenu');

    hasSubmenuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Check if the click was directly on the item or the arrow
            // We want to toggle the submenu regardless
            event.preventDefault(); // Prevent default link behavior

            const submenu = item.nextElementSibling; // The ul.submenu
            if (submenu && submenu.classList.contains('submenu')) {
                item.classList.toggle('expanded');
                submenu.classList.toggle('active');
            }
        });
    });

    // --- Mobile Sidebar Toggle Button ---
    const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (sidebarToggleBtn && sidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            // Prevent body scroll when sidebar is open on mobile
            if (sidebar.classList.contains('active')) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // --- Click outside to close sidebar on mobile ---
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 768) {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggleButton = sidebarToggleBtn.contains(event.target);

            if (sidebar.classList.contains('active') && !isClickInsideSidebar && !isClickOnToggleButton) {
                sidebar.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        }
    });

    // Optional: Add a class to body to prevent scrolling when sidebar is open on mobile
    // Add this to your CSS:
    // body.no-scroll { overflow: hidden; }
});