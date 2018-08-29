let TaskService = {
    name: 'TaskService',
    content: [
        '$http',
        function ($http) {
            return {
                get() {
                    return $http.get('/api/tasks')
                },
                post(data) {
                    return $http.post('/api/tasks', data)
                },
                put(data, id) {
                    return $http.put('/api/tasks/' + id, data)
                },
                delete(id) {
                    return $http.delete('/api/tasks/' + id)
                },
            }
        }
    ]
}

export default TaskService