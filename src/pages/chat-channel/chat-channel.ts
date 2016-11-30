import {Component, ViewChild} from "@angular/core";
import {NavController, ModalController, Events, Content} from "ionic-angular";
import {ChatFormPage} from "../chat-form/chat-form";
import {ChatChannelProvider} from "../../providers/chat-channel";
import {ChatMessagePage} from "../chat-message/chat-message";

@Component({
    selector   : 'page-chat-channel',
    templateUrl: 'chat-channel.html'
})
export class ChatChannelPage {

    @ViewChild('Content') content: Content;

    errorIcon: string      = 'chatbubbles';
    errorText: string      = '';
    data                   = [];
    loading: boolean       = true;
    showEmptyView: boolean = false;
    showErrorView: boolean = false;
    moreItem: boolean      = false;

    params = {
        limit: 20,
        page : 1
    }

    constructor(public navCtrl: NavController,
                private provider: ChatChannelProvider,
                private modalCtrl: ModalController,
                private events: Events
    ) {
        this.events.subscribe('channel:update', () => this.find());
    }

    ionViewDidLoad() {
        console.log('Hello ChatChannelPage Page');
        this.findCache().then(cache => {
            console.log('cache', cache);
            this.find();
        });
    }

    onPageMessage(item) {
        this.navCtrl.push(ChatMessagePage, {channel: item.id});
    }


    findCache() {
        return new Promise((resolve, reject) => {
            this.loading = true;
            this.provider.findCache().then(data => {
                console.log(data);
                if (data) {
                    this.data          = data;
                    this.showEmptyView = false;
                    this.showErrorView = false;
                } else {
                    this.moreItem = false;
                }

                if (this.data.length < 1) {
                    this.showEmptyView = true;
                }

                this.loading = false;
                resolve(data);
            }, error => {
                this.showErrorView = true;
                reject(error);
            });
        });
    }

    find() {
        return new Promise((resolve, reject) => {
            this.loading = true;
            this.provider.find().then(data => {
                console.log(data);
                if (data) {
                    this.data          = data;
                    this.showEmptyView = false;
                    this.showErrorView = false;
                } else {
                    this.moreItem = false;
                }

                if (this.data.length < 1) {
                    this.showEmptyView = true;
                }

                this.loading = false;
                resolve(data);
            }, error => {
                this.showErrorView = true;
                reject(error);
            });
        });
    }


    public scrollTop() {
        this.content.scrollToTop();
    }

    public doInfinite(event) {
        this.params.page++;
        this.find().then(() => event.complete());
    }

    public doRefresh(event?) {
        this.params.page = 1;
        this.find().then(() => event.complete());
    }


    onModalChatForm() {
        this.modalCtrl.create(ChatFormPage).present();
    }

}