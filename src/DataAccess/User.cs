using static Bogus.DataSets.Name;

public class User
{
    public int Id { get; set; }
    public Gender Gender { get; set; }
    public string? UserName { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Avatar { get; set; }
    public string? Email { get; set; }
}