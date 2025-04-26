namespace IA_marketPlace.Services
{
    public interface IEmailEncryptionService
    {
        string Encrypt(string input);
        string Decrypt(string encrypted);
    }
}
