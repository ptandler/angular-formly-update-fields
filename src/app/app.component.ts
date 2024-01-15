import {Component, computed, signal} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {distinctUntilChanged} from "rxjs";

const numberOfInputs = signal<number>(3)

const initialFields = [
  {
    key: 'numberOfInputs',
    type: 'number',
    props: {
      label: 'Number of Input Fields',
      placeholder: 'Input placeholder',
      required: true,
    },
    hooks: {
      onInit: (field: FormlyFieldConfig) => {
        console.log('######## add valueChange subscription for field = ', field);
        field.formControl?.valueChanges.pipe(distinctUntilChanged()).subscribe((value) => {
          if (value > 0) {
            numberOfInputs.set(value)
          }
        })
      }
    }
  },
  {
    key: 'checkbox',
    type: 'checkbox',
    props: {
      label: 'Checkbox',
    },
  },
  {
    key: 'select',
    type: 'select',
    props: {
      label: 'Select',
      placeholder: 'Select placeholder',
      required: true,
      options: [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'},
        {label: 'Option 3', value: '3'},
      ],
    },
  },
  {
    key: 'radio',
    type: 'radio',
    props: {
      label: 'Radio',
      required: true,
      options: [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'},
      ],
    },
  },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form = new FormGroup({});
  model = {};
  // fields: FormlyFieldConfig[] = initialFields;
  readonly fields = computed<FormlyFieldConfig[]>(() => {
    const fields: FormlyFieldConfig[] = [...initialFields]
    for (let i = 0; i < numberOfInputs(); i++) {
      fields.push({
        key: `input-${i}`,
        type: 'input',
        props: {
          label: `Input ${i + 1}`,
          placeholder: `Input ${i + 1} placeholder`,
          required: true,
        },
      })
    }
    return fields
  });

  onSubmit() {
    console.log(this.model);
    if (this.form.valid) {
      alert(JSON.stringify(this.model, null, 2));
    }
  }
}
