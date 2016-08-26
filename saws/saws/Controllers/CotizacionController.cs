using CrystalDecisions.CrystalReports.Engine;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace saws.Views.Cotizacion
{
    public class CotizacionController : Controller
    {

        DataSet db = new DataSet("Cotizacion");
        // GET: Cotizacion
        public ActionResult Index()
        {
            return View();
        }

        public string GenerateFileName(string context)
        {
            return context + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff") + "_" + Guid.NewGuid().ToString("N");
        }

        public string Email()
        {
            string email = "hello";
            return email;
        }

        [HttpPost]
        public ActionResult Reporte(FormCollection form)
        {


            string pais = Request.Form["Pais"];
            if (pais == "number:0")
                pais = "";
            else if (pais == "number:1")
                pais = "Australia";
            else if (pais == "number:2")
                pais = "Canada";
            else if (pais == "number:3")
                pais = "India";


            try
            {
                string filename = GenerateFileName("cotizacion");
                ReportClass rptH = new ReportClass();
                rptH.FileName = Server.MapPath("~/Reportes/Reporte.rpt");

                rptH.Load();
                //logica del reporte 

                rptH.SetDataSource(db.ToString().Select(p => new { idcotizacion = pais, pais = pais, ciudad = pais, curso = pais}));
                Response.Buffer = false;
                Response.ClearContent();
                Response.ClearHeaders();
                Stream stream = rptH.ExportToStream(CrystalDecisions.Shared.ExportFormatType.PortableDocFormat);
                stream.Seek(0, SeekOrigin.Begin);
                //  return File(stream, "application/pdf",  filename + ".pdf");
                return File(stream, "application/pdf");

            }
            catch (Exception ex)
            {
                throw;
            }

            finally
            {

            }
        }

        //protected override void Dispose(bool disposing)
        //{
        //    if (disposing)
        //    {
        //        db.Dispose();
        //    }
        //    base.Dispose(disposing);
        //}


    }

}
