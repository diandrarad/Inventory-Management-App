async function deleteImage(endpoint) {
    if (confirm('Are you sure you want to delete this image?')) {
      const adminPassword = prompt('Please enter the admin password:')
      if (adminPassword !== null) {
        try {
          const response = await fetch(`${endpoint}/delete-image`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ adminPassword })
          })

          if (response.ok) {
            window.location.href = `${endpoint}/edit`
            alert('Image deleted successfully')
          }
          else if (response.status === 401) {
            alert('Unauthorized access. Please check your admin password.')
          }
          else throw new Error('Error deleting the item')
          
        } catch (error) {
          console.error('Error:', error)
          alert('An error occurred while deleting the item')
        }
      }
    }
}
  
async function confirmDelete(endpoint) {
    if (confirm("Are you sure you want to delete this item?")) {
        const adminPassword = prompt('Please enter the admin password:')
        if (adminPassword !== null) {
          try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ adminPassword })
            })

            if (response.ok) {
              window.location.reload()
              alert('Item deleted successfully')
            }
            else if (response.status === 401) {
              alert('Unauthorized access. Please check your admin password.')
            }
            else throw new Error('Error deleting the item')
            
          } catch (error) {
            console.error('Error:', error)
            alert('An error occurred while deleting the item')
          }
        }
    }
}
  
async function confirmEdit(event, id) {
    event.preventDefault()
    const adminPassword = prompt('Please enter the admin password:')
    if (adminPassword !== null) {
      try {
        const editForm = document.getElementById('form_' + id)
        const passwordInput = document.getElementById('password_' + id)
        passwordInput.value = adminPassword
        editForm.submit()
        
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred while editing the item')
      }
    }
}

function validateForm(urlID) {
    var fileInput = document.getElementById(urlID)
    var file = fileInput.files[0]
    if (file.size > 1024 * 1024) {
        alert('File size exceeds 1 MB.')
        return false
    }
    return true
}