let TaskController = {
    name: 'TaskController',
    content: ['TaskService', 'toastr', '_', '$filter', function (tasks, toastr, _, $filter) {
        this.model = {
            id: 0,
            name: '',
            description: '',
            created_date: new Date(),
        }
        this.list = []
        this.addMode = true

        this.select = (element) => {
            this.model.id = element.Id
            this.model.name = element.Name
            this.model.description = element.Description
            this.model.created_date = new Date(element.CreatedDate)

            this.addMode = false
        }

        this.clear = () => {
            this.model.id = 0
            this.model.name = ''
            this.model.description = ''
            this.model.created_date = new Date()

            this.addMode = true
        }

        this.create = () => {
            tasks.post(data()).then(response => {
                this.list.push(response.data)
                this.clear()
                toastr.success('Se ha creado correctamente la nota')
            }, () => toastr.error('Error en envío de datos'))
        }

        this.edit = () => {
            tasks.put(data(), this.model.id).then(response => {
                let val = _.find(this.list, (l) => l.Id == this.model.id)

                val.Name = this.model.name
                val.Description = this.model.description
                val.CreatedDate = this.model.created_date

                this.clear()
                toastr.success('Se ha editado correctamente la nota')
            }, () => toastr.error('Error en envío de datos'))
        }

        this.remove = () => {
            tasks.delete(this.model.id).then(response => {
                this.list = _.filter(this.list, (l) => l.Id != this.model.id);
                this.clear()
                toastr.success('Se ha eliminado correctamente la nota')
            })
        }

        let data = () => {
            return {
                Name: this.model.name,
                Description: this.model.description,
                CreatedDate: $filter('date')(this.model.created_date, 'yyyy/MM/dd'),
            }
        }

        tasks.get().then(response => this.list = response.data);
    }]
}

export default TaskController
