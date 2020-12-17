namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourceUser {get; set;}
        public int SourceUserId { get; set; }
        public AppUser LiskedUser {get; set;}
        public int LiskedUserId { get; set; }
    }
}