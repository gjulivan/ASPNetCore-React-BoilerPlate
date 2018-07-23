using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace Web.Helpers
{
    public static class AppFileHelper
    {

        public static string Save(IFormFile file, string rootPath)
        {
            var path = DateTime.Now.Year.ToString()
                     + DateTime.Now.Month.ToString()
                     + DateTime.Now.Day.ToString()
                     + Guid.NewGuid() + Path.GetExtension(file.FileName);

            var fullPath = Path.Combine($"{rootPath}", path);

            if (file.Length > 0)
            {
                if(!Directory.Exists(Path.GetDirectoryName(fullPath)))
                    Directory.CreateDirectory(Path.GetDirectoryName(fullPath));

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyToAsync(stream);
                }
            }

            return path;
        }
    }
}
