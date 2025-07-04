@echo off
echo ========================================
echo   Pushing Portfolio to GitHub
echo ========================================
echo.
echo Repository: https://github.com/Gerfani/Ghazal-Erfani-Portfolio.git
echo.

echo Checking Git status...
git status
echo.

echo Adding any new changes...
git add .
echo.

echo Checking if there are changes to commit...
git diff --cached --quiet
if %errorlevel% neq 0 (
    echo Creating new commit...
    git commit -m "Update portfolio content"
    echo.
) else (
    echo No new changes to commit.
    echo.
)

echo Pushing to GitHub...
echo.
echo NOTE: You will be prompted for your GitHub credentials:
echo Username: Gerfani
echo Password: Use your GitHub password or Personal Access Token
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   SUCCESS! Your portfolio is now on GitHub!
    echo   Visit: https://github.com/Gerfani/Ghazal-Erfani-Portfolio
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   PUSH FAILED - See error messages above
    echo ========================================
    echo.
    echo Common solutions:
    echo 1. Make sure you're using the correct GitHub username: Gerfani
    echo 2. Use your GitHub password or Personal Access Token
    echo 3. Check if the repository exists and is accessible
)

echo.
pause
