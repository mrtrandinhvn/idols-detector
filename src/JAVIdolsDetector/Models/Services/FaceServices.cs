using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;

namespace JAVIdolsDetector.Models.Services
{
    public class FaceServices
    {
        public Face Face { get; set; }
        public string Mode { get; set; }
        public IList<IFormFile> Images { get; set; }
        public void AddEdit(IdolsDetectorContext dbContext)
        {
            if (this.Mode.Equals("edit", StringComparison.OrdinalIgnoreCase))
            {
                var face = dbContext.Face.Where(g => g.FaceId == this.Face.FaceId).FirstOrDefault();
                if (face != null)
                {
                    face.FaceOnlineId = this.Face.FaceOnlineId;
                    face.ImageUrl = this.Face.ImageUrl;
                }
            }
            else
            {
                this.Face.FaceOnlineId = Guid.NewGuid();
                dbContext.Face.Add(this.Face);
            }
            dbContext.SaveChanges();
        }
        public void Delete(IdolsDetectorContext dbContext)
        {
            dbContext.Face.Remove(this.Face);
            dbContext.SaveChanges();
        }
        public static IEnumerable<Face> LoadFaces(IdolsDetectorContext dbContext, int? faceId = null, int? personId = null)
        {
            var result = new List<Face>();
            result = dbContext.Face.Where(f => (
                (f.FaceId == faceId) || (faceId == null) && (personId == null || f.PersonId == personId)
            )).ToList();
            return result;
        }
    }
}
