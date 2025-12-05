document.addEventListener('alpine:init', () => {
    Alpine.data('designAgent', () => ({
        // UI State
        mobileMenuOpen: false,

        // Chat Bubble State
        isOpen: false,
        isLoading: false,
        apiKey: 'YOUR_GEMINI_API_KEY',
        userInput: '',
        messages: [
            {
                role: 'agent',
                type: 'text',
                content: 'Hello! I\'m your AI Design Assistant. Describe your dream space and I\'ll create designs for you.'
            }
        ],

        // Playground State
        playgroundInput: '',
        playgroundLoading: false,
        playgroundSketch: null,
        playgroundRender: null,

        toggleChat() {
            this.isOpen = !this.isOpen;
        },

        // Chat bubble message handler
        async sendMessage() {
            if (!this.userInput.trim()) return;

            const prompt = this.userInput;
            this.addMessage('user', 'text', prompt);
            this.userInput = '';
            this.isLoading = true;

            try {
                await this.generateImage(prompt, 'sketch');
                await this.generateImage(prompt, 'photorealistic');
            } catch (error) {
                console.error('Generation failed:', error);
                this.addMessage('agent', 'text', 'Sorry, I encountered an error generating your design. Please check your API key and try again.');
            } finally {
                this.isLoading = false;
            }
        },

        // Playground generation handler
        async generatePlaygroundDesign() {
            if (!this.playgroundInput.trim()) return;

            const prompt = this.playgroundInput;
            this.playgroundLoading = true;
            this.playgroundSketch = null;
            this.playgroundRender = null;

            try {
                // Generate sketch
                const sketchUrl = await this.generateImageUrl(prompt, 'sketch');
                this.playgroundSketch = sketchUrl;

                // Generate render
                const renderUrl = await this.generateImageUrl(prompt, 'photorealistic');
                this.playgroundRender = renderUrl;
            } catch (error) {
                console.error('Playground generation failed:', error);
                alert('Sorry, image generation failed. Please try again.');
            } finally {
                this.playgroundLoading = false;
            }
        },

        // Generate image and return URL (for playground)
        async generateImageUrl(prompt, style) {
            const imagePrompt = style === 'sketch'
                ? `A simple black and white architectural line sketch of ${prompt}, white background, high contrast`
                : `A photorealistic 8k architectural render of ${prompt}, interior design, cinematic lighting, highly detailed`;

            if (this.apiKey === 'YOUR_GEMINI_API_KEY') {
                // Fallback to Pollinations.ai
                await new Promise(resolve => setTimeout(resolve, 1500));
                const encodedPrompt = encodeURIComponent(imagePrompt);
                return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${style === 'sketch' ? 512 : 1024}&height=${style === 'sketch' ? 512 : 1024}&nologo=true`;
            }

            // Real API implementation would go here
            // For demo, return pollinations URL
            const encodedPrompt = encodeURIComponent(imagePrompt);
            return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true`;
        },

        // Generate image for chat (adds to messages)
        async generateImage(prompt, style) {
            const imageUrl = await this.generateImageUrl(prompt, style);
            this.addMessage('agent', 'image', imageUrl);
            this.addMessage('agent', 'text', `Here is the ${style} version.`);
        },

        addMessage(role, type, content) {
            this.messages.push({ role, type, content });
            this.$nextTick(() => {
                const chatBody = document.getElementById('chat-body');
                if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
            });
        }
    }));
});
