// Blog post management
class BlogManager {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blog_posts')) || [];
        this.categories = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Other'];
        this.init();
    }

    init() {
        this.displayPosts();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchPosts(e.target.value));
        }

        // New post form
        const postForm = document.getElementById('post-form');
        if (postForm) {
            postForm.addEventListener('submit', (e) => this.handleNewPost(e));
        }

        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => this.filterByCategory(e.target.value));
        }
    }

    createPost(title, content, category, tags) {
        const post = {
            id: Date.now(),
            title,
            content,
            category,
            tags: tags.split(',').map(tag => tag.trim()),
            date: new Date().toISOString(),
            views: 0
        };

        this.posts.unshift(post);
        this.savePosts();
        this.displayPosts();
        return post;
    }

    handleNewPost(e) {
        e.preventDefault();
        const form = e.target;
        const title = form.querySelector('#post-title').value;
        const content = form.querySelector('#post-content').value;
        const category = form.querySelector('#post-category').value;
        const tags = form.querySelector('#post-tags').value;

        this.createPost(title, content, category, tags);
        form.reset();
        
        // Hide the form
        const modal = document.getElementById('new-post-modal');
        modal.style.display = 'none';
    }

    searchPosts(query) {
        const filteredPosts = this.posts.filter(post => {
            const searchString = `${post.title} ${post.content} ${post.category} ${post.tags.join(' ')}`.toLowerCase();
            return searchString.includes(query.toLowerCase());
        });
        this.displayPosts(filteredPosts);
    }

    filterByCategory(category) {
        if (category === 'all') {
            this.displayPosts();
        } else {
            const filteredPosts = this.posts.filter(post => post.category === category);
            this.displayPosts(filteredPosts);
        }
    }

    displayPosts(postsToDisplay = this.posts) {
        const postList = document.querySelector('.post-list');
        if (!postList) return;

        postList.innerHTML = postsToDisplay.map(post => `
            <div class="post-item" style="margin-bottom: var(--spacing-md);">
                <h3>${post.title}</h3>
                <p class="post-meta" style="color: var(--text-light);">
                    Posted on ${new Date(post.date).toLocaleDateString()} | 
                    Category: ${post.category} | 
                    Views: ${post.views}
                </p>
                <p class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
                </p>
            </div>
        `).join('');

        // Update stats
        this.updateStats();
    }

    updateStats() {
        const statsElement = document.getElementById('blog-stats');
        if (statsElement) {
            const totalViews = this.posts.reduce((sum, post) => sum + post.views, 0);
            const lastUpdate = this.posts.length > 0 
                ? new Date(this.posts[0].date).toLocaleDateString()
                : 'No posts yet';

            statsElement.innerHTML = `
                <p>Total Posts: ${this.posts.length}</p>
                <p>Total Views: ${totalViews}</p>
                <p>Last Updated: ${lastUpdate}</p>
            `;
        }
    }

    savePosts() {
        localStorage.setItem('blog_posts', JSON.stringify(this.posts));
    }
}
