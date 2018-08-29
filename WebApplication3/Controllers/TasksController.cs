using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication3.Models;
using Newtonsoft.Json;
using System.Text;
using System.Data.Entity;
using System.Data.Entity.Validation;

namespace WebApplication3.Controllers
{
    public class TasksController : ApiController
    {
        protected readonly PruebaContext db = new PruebaContext();

        protected HttpResponseMessage ToJson(dynamic obj)
        {
            var response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StringContent(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/json");
            return response;
        }

        protected HttpResponseMessage JsonError(string message)
        {
            var response = Request.CreateResponse(HttpStatusCode.BadRequest);
            response.Content = new StringContent(JsonConvert.SerializeObject(message), Encoding.UTF8, "application/json");
            return response;
        }
        
        public HttpResponseMessage Get()
        {
            return ToJson(db.Tasks.AsEnumerable());
        }

        public HttpResponseMessage Post([FromBody]Tasks value)
        {
            try
            {
                var task = db.Tasks.Add(value);
                db.SaveChanges();
                return ToJson(task);
            }
            catch (DbEntityValidationException ex)
            {
                return JsonError("Datos de entrada invalidos");
            }
        }

        public HttpResponseMessage Put(int id, [FromBody]Tasks value)
        {
            try
            {
                value.Id = id;
                db.Entry(value).State = EntityState.Modified;
                return ToJson(db.SaveChanges());
            }
            catch (DbEntityValidationException ex)
            {
                return JsonError("Datos de entrada invalidos");
            }
        }

        public HttpResponseMessage Delete(int id)
        {
            db.Tasks.Remove(db.Tasks.FirstOrDefault(x => x.Id == id));
            return ToJson(db.SaveChanges());
        }
    }
}
