import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UploadServiceService} from '../../../../_services/upload-service.service';
import {NewsService} from '../../../../_services/news.service';
import {MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';

@Component({
    selector: 'app-create-news-form',
    templateUrl: './create-news-form.component.html',
    styles: []
})
export class CreateNewsFormComponent implements OnInit {
    createNews: FormGroup;
    @ViewChild('fileInput') fileInput;
    fileId: string[] = [];
    isImageAdded: boolean = false;
    imagesArray: string[] = [];


    constructor(
        fb: FormBuilder,
        private uploadServiceService: UploadServiceService,
        private newsService: NewsService,
        public snackBarComponent: MatSnackBar,
        private snackBarService: SnackBarService
    ){
    this.createNews = fb.group({
    'title': [null],
    'text': [null]/*,
    'legalType': ['individual']*/
});
}

    ngOnInit() {
    }

    addFile(): void {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.uploadServiceService
                .upload(fileToUpload)
                .subscribe(res => {
                    this.setimgId(res.file.id);
                    this.isImageAdded = true;
                    this.imagesArray.push(res.file.url);
                });
        }
    }

    onSubmitForm(form: FormGroup) {
        let createData = {
            'mode': 'ALL_ORGANIZATIONS_OF_TYPES',
            'organizationTypes': ['individual', 'merchant'],
            'creationPolicy': 'CREATE_NEW',
            'title': this.createNews.get('title').value,
            'text': this.createNews.get('text').value,
            'fileIds': this.fileId
        };
        this.newsService.createNews(createData).then(this.resetForm.bind(this)).then(res => this.newsService.updateNews());

    }

    setimgId(id) {
        this.fileId.push(id);
    }

    setImagesUrls(arr) {
        for (let item of arr) {
            this.imagesArray.push(item);
        }
    }

    resetForm(){
        this.openSnackBarComponent();
        this.createNews.controls['title'].patchValue(null);
        this.createNews.controls['text'].patchValue(null);
        this.isImageAdded = false;
        this.imagesArray = [];
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('News created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }



}
