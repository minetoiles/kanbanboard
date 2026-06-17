
$files = @("src/main/java/com/example/kanbanboard_be/domain/task/controller/docs/TaskControllerDocs.java", "src/main/java/com/example/kanbanboard_be/domain/task/controller/TaskController.java")
foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 239 -and $bytes[1] -eq 187 -and $bytes[2] -eq 191) {
        $newBytes = New-Object byte[] ($bytes.Length - 3)
        [System.Array]::Copy($bytes, 3, $newBytes, 0, $newBytes.Length)
        [System.IO.File]::WriteAllBytes($f, $newBytes)
    }
}

