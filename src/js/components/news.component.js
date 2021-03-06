import { AuthService } from '../services/auth.service';
import { Routing } from '../core/routing.service';
import { NewsService } from '../services/news.service';

export class NewsComponent {
    constructor() {
        this._authService = new AuthService();
        this._routing = new Routing();
        this._newsService = new NewsService();
        
        this._authToken = this._authService.token;
        this._news;
    }
    
    async beforeRender() {
        this._news = await this._newsService.getNews(this._authService.token);
    }
    
    render() {
        let marckup = '';
    
        if (!this._news) {
            marckup += `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    <div class="col">
                      Ошибка получения новостей...
                    </div>
                  </div>
                </div>
            `;
        } else if (this._news.news.length === 0) {
            marckup += `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    <div class="col">
                      Не найдено ни одной новости...
                    </div>
                  </div>
                </div>
            `;
        } else if (this._news) {
            for (let i = 0; i < this._news.news.length; i++) {
                marckup += `
                <div class="container">
                  <div class="row" style="padding-top: 40px">
                    <div class="col-2">
                      <div class="card-wrapper">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card ...</p>
                        <p class="card-text"><small class="text-muted">Last updated...</small></p>
                      </div>
                    </div>
                    <div class="col">
                      <img src="${this._news.news[i].pictures[0].url}" class="card-img" alt="...">
                    </div>
                  </div>
                </div>
            `;
            }
        }
        
        return marckup;
    }
    
    afterRender() {
    
    }
    
}