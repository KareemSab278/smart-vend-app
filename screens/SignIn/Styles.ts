import { StyleSheet } from "react-native";

export { LogInStyles, RegisterStyles, SignInStyles };

const LogInStyles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
  },
  spinner: {
    marginTop: 12,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  switchText: {
    color: '#444',
    fontSize: 14,
  },
  switchAction: {
    color: '#481186bd',
    fontSize: 14,
    fontWeight: '700',
  },
  forgotPassword: {
    marginTop: 12,
    color: '#7c3aed',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});


const SignInStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    paddingTop: 32,
  },
  header: {
    gap: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  switchButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  switchTab: {
    flex: 1,
    backgroundColor: '#f4efff',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },
  switchTabActive: {
    backgroundColor: '#481186bd',
  },
  switchTabText: {
    color: '#5d5d5d',
    fontSize: 15,
    fontWeight: '700',
  },
  switchTabTextActive: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#faf7ff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#ece8f7',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 5,
  },
  statusMessage: {
    marginTop: 18,
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
});


const RegisterStyles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginTop: 16,
  },
  nameRow: {
    flexDirection: 'row',
    gap: 12,
  },
  nameField: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 12,
  },
  checkboxText: {
    fontSize: 14,
    color: '#444',
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 12,
    fontSize: 14,
  },
  progress: {
    marginTop: 12,
    height: 4,
    borderRadius: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  switchText: {
    color: '#444',
    fontSize: 14,
  },
  switchAction: {
    color: '#481186bd',
    fontSize: 14,
    fontWeight: '700',
  },
  googleSection: {
    marginTop: 24,
    alignItems: 'center',
  },
  googleText: {
    color: '#666',
    marginBottom: 10,
    fontSize: 14,
  },
  googleButton: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d7d3ea',
    minWidth: 160,
  },
  googleButtonText: {
    color: '#481186bd',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
});
