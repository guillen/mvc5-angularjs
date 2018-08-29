import angular from 'angular'

import TaskController from './Tasks/controller.module'
import TaskService from './Tasks/service.module'
import toastr from 'toastr'

let _ = require('lodash')

angular.module('PruebaModule', [])
    .value('_', _)
    .value('toastr', toastr)
    .service(TaskService.name, TaskService.content)
    .controller(TaskController.name, TaskController.content)
